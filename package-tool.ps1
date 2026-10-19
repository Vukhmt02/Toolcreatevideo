param(
    [string]$OutputDirectory = "dist"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distRoot = Join-Path $projectRoot $OutputDirectory
$stamp = Get-Date -Format "yyyyMMdd-HHmm"
$packageName = "ToolCreateVideo-$stamp"
$stagingRoot = Join-Path $distRoot $packageName
$zipPath = Join-Path $distRoot "$packageName.zip"

New-Item -ItemType Directory -Path $distRoot -Force | Out-Null
New-Item -ItemType Directory -Path $stagingRoot -Force | Out-Null

$files = @(
    "app.py",
    "config.py",
    "requirements.txt",
    "README.md",
    "HUONG_DAN_CAI_DAT.md",
    ".env.example",
    "start.bat",
    "start-flow.bat"
)

$directories = @(
    "core",
    "services",
    "static",
    "templates",
    "examples"
)

foreach ($relativePath in $files) {
    $source = Join-Path $projectRoot $relativePath
    if (-not (Test-Path -LiteralPath $source)) {
        throw "Missing packaging input: $relativePath"
    }
    Copy-Item -LiteralPath $source -Destination $stagingRoot
}

foreach ($relativePath in $directories) {
    $source = Join-Path $projectRoot $relativePath
    if (-not (Test-Path -LiteralPath $source)) {
        throw "Missing packaging input: $relativePath"
    }
    Copy-Item -LiteralPath $source -Destination $stagingRoot -Recurse
}

New-Item -ItemType Directory -Path (Join-Path $stagingRoot "storage\projects") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $stagingRoot "storage\temp") -Force | Out-Null

$quickStartDirectory = Join-Path $stagingRoot "00_BAT_DAU_TAI_DAY"
New-Item -ItemType Directory -Path $quickStartDirectory -Force | Out-Null
$quickStartContent = "@echo off`r`ncall `"%~dp0..\start.bat`"`r`n"
Set-Content -LiteralPath (Join-Path $quickStartDirectory "KHOI_DONG_TOOL.bat") -Value $quickStartContent -Encoding Ascii -NoNewline

Get-ChildItem -LiteralPath $stagingRoot -Directory -Recurse -Force |
    Where-Object { $_.Name -eq "__pycache__" } |
    Remove-Item -Recurse -Force

if (Test-Path -LiteralPath $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}
Compress-Archive -LiteralPath $stagingRoot -DestinationPath $zipPath -CompressionLevel Optimal
Remove-Item -LiteralPath $stagingRoot -Recurse -Force

Write-Host ""
Write-Host "Package created:" -ForegroundColor Green
Write-Host $zipPath
Write-Host ""
Write-Host "The ZIP excludes .env, API keys, Chrome login profiles, generated videos, caches, and .venv."
