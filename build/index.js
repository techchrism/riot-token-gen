// Build the powershell into one file
const fs = require('fs').promises;
const path = require('path');

(async () =>
{
    const files = [
        fs.readFile(path.join(__dirname, '..', 'New-Riot-Token.ps1'), 'utf8'),
        fs.readFile(path.join(__dirname, '..', 'Riot-Token-CLI.ps1'), 'utf8')
    ];
    const [riotTokenFunction, riotTokenCLI] = await Promise.all(files);

    try
    {
        await fs.mkdir(path.join(__dirname, '..', 'dist'));
    }
    catch(ignored) {}

    const builtScriptText = riotTokenCLI.replace('. .\\New-Riot-Token.ps1', riotTokenFunction);
    await fs.writeFile(path.join(__dirname, '..', 'dist', 'Riot-Token-CLI.ps1'), builtScriptText, 'utf8');
})();