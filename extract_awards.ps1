
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = $ua
$session.Headers.Add("Referer", "https://sparshhospitals.com/")

try {
    $r = Invoke-WebRequest -Uri 'https://sparshhospitals.com/accreditations-awards/' -WebSession $session -UseBasicParsing -TimeoutSec 30
    Write-Host "Status: $($r.StatusCode)"
    Write-Host "=== ACCREDITATION IMAGES ==="
    $pattern = 'https://sparshhospitals\.com/wp-content/uploads/[^"'' \s>]+\.(jpg|jpeg|png|webp)'
    $found = [System.Text.RegularExpressions.Regex]::Matches($r.Content, $pattern)
    $found | ForEach-Object { $_.Value } | Sort-Object -Unique | ForEach-Object { Write-Host $_ }
} catch {
    Write-Host "Error status: $($_.Exception.Response.StatusCode)"
    Write-Host "Message: $($_.Exception.Message)"
}
