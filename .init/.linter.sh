#!/bin/bash
cd /home/kavia/workspace/code-generation/premium-streaming-platform-211925-211934/netflix_clone_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

