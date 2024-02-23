#!/bin/bash

frontendPath="./frontend"
backendPath="./backend"

(cd $frontendPath && npm run dev) &
(cd $backendPath && gradle bootRun)