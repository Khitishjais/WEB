
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = $ua

try {
    $r1 = Invoke-WebRequest -Uri 'https://sparshhospitals.com/board-of-directors/' -WebSession $session -UseBasicParsing
    Write-Host "=== BOARD PAGE IMAGES ==="
    $matches1 = [System.Text.RegularExpressions.Regex]::Matches($r1.Content, 'src="(https://sparshhospitals\.com/wp-content/uploads/[^"]+)"')
    foreach ($m in $matches1) { Write-Host $m.Groups[1].Value }
} catch {
    Write-Host "BOD Error: $_"
}

try {
    $r2 = Invoke-WebRequest -Uri 'https://sparshhospitals.com/accreditations-awards/' -WebSession $session -UseBasicParsing
    Write-Host ""
    Write-Host "=== ACCREDITATIONS PAGE IMAGES ==="
    $matches2 = [System.Text.RegularExpressions.Regex]::Matches($r2.Content, 'src="(https://sparshhospitals\.com/wp-content/uploads/[^"]+)"')
    foreach ($m in $matches2) { Write-Host $m.Groups[1].Value }
} catch {
    Write-Host "Accred Error: $_"
}
