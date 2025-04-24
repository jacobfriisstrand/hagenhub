#!/bin/bash

if [ -n "$(git diff --cached --name-only prisma/schema.prisma)" ]; then
  if [ -z "$(git diff --cached --name-only prisma/migrations/*.sql)" ]; then
    echo
    echo "Error: Schema changes detected but no migration file found."
    echo "Please run \"npm run migrate:branch\" to create a migration with the current branch name"
    echo
    exit 1
  fi
fi 