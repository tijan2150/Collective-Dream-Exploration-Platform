# Decentralized Collective Dream Exploration Platform

A blockchain-based platform for synchronized, collective dream experiences. Built with Clarity smart contracts on the Stacks blockchain, this project enables shared dreamscapes, subconscious data mining, and lucid dreaming interactions in a decentralized environment.

## Overview

This platform leverages four smart contracts to create a novel dream exploration ecosystem:
1. **Dream State Synchronization**: Coordinates participants for shared dream sessions.
2. **Subconscious Data Mining**: Extracts and aggregates insights from collective dream patterns.
3. **Dream World Construction**: Builds and maintains shared dreamscapes.
4. **Lucid Dreaming Interface**: Enables conscious interactions within dreams.

The system assumes an off-chain mechanism (e.g., brain-computer interface) feeds dream data to the blockchain, where contracts manage synchronization, storage, and interaction.

## Features

- **Session Management**: Start, join, and end dream sessions with participant tracking.
- **Data Insights**: Anonymized dream pattern submission and aggregated insights.
- **Dreamscape Creation**: Collaborative construction and updating of shared dream worlds.
- **Lucid Control**: Enter lucid states and perform actions in shared dreams.

## Contracts

### 1. Dream State Synchronization
- File: `dream-state-sync.clar`
- Functions:
    - `start-session`: Initiates a new session (owner only).
    - `join-session`: Adds a participant to an active session.
    - `end-session`: Closes a session (owner only).
    - `get-session`: Retrieves session details.

### 2. Subconscious Data Mining
- File: `subconscious-data-mining.clar`
- Functions:
    - `submit-dream-data`: Logs a participant’s dream pattern.
    - `aggregate-insights`: Summarizes patterns into insights (owner only).
    - `get-insights`: Reads session insights.

### 3. Dream World Construction
- File: `dream-world-construction.clar`
- Functions:
    - `create-dreamscape`: Defines a new dreamscape.
    - `update-dreamscape`: Modifies an existing dreamscape (creator or owner).
    - `deactivate-dreamscape`: Disables a dreamscape (owner only).
    - `get-dreamscape`: Retrieves dreamscape details.

### 4. Lucid Dreaming Interface
- File: `lucid-dreaming-interface.clar`
- Functions:
    - `enter-lucid-state`: Marks a participant as lucid.
    - `perform-action`: Records an action in a lucid state.
    - `exit-lucid-state`: Ends lucid participation.
    - `get-participant-status`: Checks a participant’s lucid status.

## Testing

Tests are written with [Vitest](https://vitest.dev/) to simulate contract behavior in JavaScript:
- Files: `dream-sync.test.js`, `data-mining.test.js`, `world-construction.test.js`, `lucid-interface.test.js`
- Run: `npm test` after installing dependencies.

## Prerequisites

- [Stacks Blockchain](https://www.stacks.co/)
- [Clarinet](https://github.com/hirosystems/clarinet) (for Clarity development/testing)
- Node.js and npm (for Vitest)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dream-exploration-platform.git
   cd dream-exploration-platform
