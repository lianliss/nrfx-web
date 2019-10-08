#!/usr/bin/env bash

branch_name="beta"

if [ "$1" == "$branch_name" ]; then
    # Saves uncommitted changes and reset repo
    git stash
    git reset --hard

    # Move to master branch
    git checkout "$branch_name"

    # Pull latest commits from master
    git pull origin "$branch_name"

    # Build
    npm run build

    # Expose redeploy.sh script to webhook daemon
    chmod +x ./scripts/redeploy.sh
fi
