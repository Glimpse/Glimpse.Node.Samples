@echo off

if "%1%" == "--help" (
  goto :OUTPUT_HELP
)
if "%1%" == "-?" (
  goto :OUTPUT_HELP    
)
if "%1%" == "-h" (
  goto :OUTPUT_HELP    
)
if "%1%" == "--h" (
  goto :OUTPUT_HELP    
)
if "%1" == "" (
    echo installing default version from alpha feed
    set version=
    goto :INSTALL
) else (
    echo installing default version %1% from alpha feed
    set version=@%1%
    goto :INSTALL
)

goto :EOF

:INSTALL

call npm config set @glimpse:registry=https://www.myget.org/F/g-alpha/npm/

call :INSTALL_GLIMPSE calculator.web
call :INSTALL_GLIMPSE_AGENT calculator.addition
call :INSTALL_GLIMPSE_AGENT calculator.batch
call :INSTALL_GLIMPSE_AGENT calculator.division
call :INSTALL_GLIMPSE_AGENT calculator.multiply
call :INSTALL_GLIMPSE_AGENT calculator.subtract

goto :EOF

:INSTALL_GLIMPSE
echo "installing glimpse to %1"
pushd %~dp0\%1
call npm install @glimpse/glimpse%version%
popd
exit /b 0

:INSTALL_GLIMPSE_AGENT
echo "installing glimpse agent to %1"
pushd %~dp0\%1
call npm install @glimpse/glimpse-agent-node%version%
popd
exit /b 0

:OUTPUT_HELP
echo "usage: useAlphaFeed.cmd <version>"
echo "example: usageAlphaFeed.cmd 0.21.4"
goto :EOF
