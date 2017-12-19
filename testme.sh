#!/usr/bin/env bash
cd client && grunt --stack && grunt release && cd ../server && grunt --stack && cd ..
