@echo off
rem Builds the website on this computer and opens it in the browser.
rem Needs Python (https://www.python.org) - first run installs the two libraries below.
cd /d "%~dp0"
python -c "import openpyxl, PIL" 2>nul || python -m pip install openpyxl Pillow
python tools\build.py || (pause & exit /b 1)
start "" http://localhost:8000
python -m http.server 8000 --directory _site
