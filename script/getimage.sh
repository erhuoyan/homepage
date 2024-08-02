#!/bin/bash

# Get the directory where the script is located
script_dir=$(dirname "$(readlink -f "$0")")


# Change the current working directory the script directory
cd "$script_dir"

python3 getimage.py
