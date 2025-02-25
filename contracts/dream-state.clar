(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_ALREADY_JOINED (err u101))
(define-constant ERR_NOT_IN_SESSION (err u102))

;; Map to track participants in a dream session
(define-map DreamSessions
  { session-id: uint }
  { participants: (list 100 principal), start-time: uint, active: bool })

;; Join a dream session
(define-public (join-session (session-id uint))
  (let ((session (unwrap! (map-get? DreamSessions { session-id: session-id }) (err u103))))
    (asserts! (not (is-some (index-of (get participants session) tx-sender))) ERR_ALREADY_JOINED)
    (asserts! (get active session) (err u104))
    (map-set DreamSessions
      { session-id: session-id }
      {
        participants: (unwrap! (as-max-len? (append (get participants session) tx-sender) u100) (err u105)),
        start-time: (get start-time session),
        active: true
      })
    (ok true)))

;; Start a new dream session (only contract owner)
(define-public (start-session (session-id uint) (start-time uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (asserts! (is-none (map-get? DreamSessions { session-id: session-id })) (err u106))
    (map-set DreamSessions
      { session-id: session-id }
      { participants: (list), start-time: start-time, active: true })
    (ok true)))

;; End a session (only contract owner)
(define-public (end-session (session-id uint))
  (let ((session (unwrap! (map-get? DreamSessions { session-id: session-id }) (err u103))))
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (map-set DreamSessions
      { session-id: session-id }
      { participants: (get participants session), start-time: (get start-time session), active: false })
    (ok true)))

;; Read session details
(define-read-only (get-session (session-id uint))
  (map-get? DreamSessions { session-id: session-id }))
