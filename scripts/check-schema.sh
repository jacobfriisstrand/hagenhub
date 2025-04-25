#!/bin/bash

# Function to check if schema changes affect database structure
check_schema_changes() {
  # Get the staged content of schema.prisma
  git show ":prisma/schema.prisma" > /tmp/staged_schema.prisma
  # Get the HEAD version of schema.prisma
  git show "HEAD:prisma/schema.prisma" > /tmp/head_schema.prisma
  
  # Remove generator blocks from both files
  sed -i.bak '/^generator/,/^}/d' /tmp/staged_schema.prisma
  sed -i.bak '/^generator/,/^}/d' /tmp/head_schema.prisma
  
  # Compare the files
  diff /tmp/staged_schema.prisma /tmp/head_schema.prisma > /dev/null
  return $?
}

# Check if schema.prisma is staged for commit
if [ -n "$(git diff --cached --name-only prisma/schema.prisma)" ]; then
  # Check if the changes affect database structure
  if check_schema_changes; then
    # No structural changes, exit successfully
    exit 0
  fi
  
  # Structural changes detected, check for migration
  if [ -z "$(git diff --cached --name-only prisma/migrations/*.sql)" ]; then
    echo
    echo "Error: Database schema changes detected but no migration file found."
    echo "Please run \"npm run migrate:branch\" to create a migration with the current branch name"
    echo
    exit 1
  fi
fi 