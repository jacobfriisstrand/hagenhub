#!/bin/bash

if [ -n "$(git diff --cached --name-only prisma/schema.prisma)" ]; then
  if [ -z "$(git diff --cached --name-only prisma/migrations/*.sql)" ]; then
    echo
    echo "Error: Schema changes detected but no migration file found."
    echo "Please run \"npx prisma migrate dev\" to create a migration"
    echo
    exit 1
  fi
fi 