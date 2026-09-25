# NoPayStation-to-pkgiPSP

| Name        | Description                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| contentid   | is the full content id of the item, for example: UP0000-NPXX99999_00-0000112223333000.                                                  |
| type        | is a number for the item's content type. See the table below for details. (set it to 0 if unknown)                                      |
| name        | is a string for the item's name.                                                                                                        |
| description | is a string for the item's description.                                                                                                 |
| rap         | the 16 hex bytes for a RAP file, if needed by the item (.rap files will be created on ms0:/PKG/RAP). Leave empty to skip the .rap file. |
| url         | is the HTTP/HTTPS/FTP/FTPS URL where to download the .pkg file.                                                                         |
| size        | is the size in bytes of the .pkg file, or 0 if unknown.                                                                                 |
| checksum    | is a SHA256 digest of the .pkg file (as 32 hex bytes) to make sure the file is not tampered with. Leave empty to skip the check.        |

## Content types

| Type value | Content type | DB File              |
| ---------- | ------------ | -------------------- |
| 0          | Unknown      |                      |
| 1          | Game         | `pkgi_games.txt`     |
| 2          | DLC          | `pkgi_dlcs.txt`      |
| 3          | Theme        | `pkgi_themes.txt`    |
| 4          | PSX          | `pkgi_psx.txt`       |
| 5          | Demo         | `pkgi_demos.txt`     |
| 6          | Update       | `pkgi_updates.txt`   |
| 7          | Emulator     | `pkgi_emulators.txt` |
| 8          | Application  | `pkgi_apps.txt`      |

| pkgi-psp    | NoPayStation    |
| ----------- | --------------- |
| contentid   | Content ID      |
| type        | -               |
| name        | Name            |
| description | -               |
| rap         | -               |
| url         | PKG direct link |
| size        | File Size       |
| checksum    | SHA256          |

| Title ID  | Region | Type | Name                              | PKG direct link | Content ID | Last Modification Date | RAP Download | .RAP file | File Size | SHA256 |
| --------- | ------ | ---- | --------------------------------- | --------------- | ---------- | ---------------------- | ------------ | --------- | --------- | ------ |
| NPJH50040 | JP     | PSP  | ペルソナ３ポータブル PSP the Best | MISSING         |

451 717 536
