#!/usr/bin/env bash

prod_branch="beta"

if [ "$1" == "$prod_branch" ]; then
    # Saves uncommitted changes and reset repo
    git stash
    git reset --hard

    # Move to master branch
    git checkout beta

    # Pull latest commits from master
    git pull origin beta

    # Build
    npm run build

    # Expose redeploy.sh script to webhook daemon
    chmod +x ./scripts/redeploy.sh
fi
