(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u200))
(define-constant ERR_NO_DATA (err u201))

;; Map to store dream data contributions (anonymized)
(define-map DreamData
  { session-id: uint, contributor-id: uint }
  { pattern: (string-ascii 256), timestamp: uint })

;; Map to store aggregated insights per session
(define-map SessionInsights
  { session-id: uint }
  { insight-summary: (string-ascii 1024), participant-count: uint })

;; Submit dream data for mining
(define-public (submit-dream-data (session-id uint) (contributor-id uint) (pattern (string-ascii 256)))
  (begin
    (map-set DreamData
      { session-id: session-id, contributor-id: contributor-id }
      { pattern: pattern, timestamp: block-height })
    (ok true)))

;; Aggregate data into insights (only contract owner)
(define-public (aggregate-insights (session-id uint) (insight-summary (string-ascii 1024)))
  (let ((participant-count (fold count-participants (map-get? DreamData { session-id: session-id }) u0)))
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (asserts! (> participant-count u0) ERR_NO_DATA)
    (map-set SessionInsights
      { session-id: session-id }
      { insight-summary: insight-summary, participant-count: participant-count })
    (ok true)))

;; Helper function to count participants
(define-private (count-participants (entry (tuple (session-id uint) (contributor-id uint) (pattern (string-ascii 256)) (timestamp uint))) (acc uint))
  (+ acc u1))

;; Read insights for a session
(define-read-only (get-insights (session-id uint))
  (map-get? SessionInsights { session-id: session-id }))
