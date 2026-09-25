# NoPayStation-to-pkgiPSP

Everything about pkgiPSP specifics can be found in [pkgiPSP's repo.](https://github.com/bucanero/pkgi-psp)

## How to use

### SEA (single executable application)

1. Place the SEA in the same folder as your NoPayStation db files resides, like so:
```
some-dir/
├─ PSP_DLCS.tsv
├─ PSP_GAMES.tsv
├─ PSP_THEMES.tsv
├─ PSP_THEMES.tsv
├─ NoPayStation-to-pkgiPSP
```
2. Run the application
3. The result should look something like this:
```
some-dir/
├─ PSP_DLCS.tsv
├─ PSP_GAMES.tsv
├─ PSP_THEMES.tsv
├─ NoPayStation-to-pkgiPSP
├─ pkgi_dlcs.txt
├─ pkgi_games.txt
├─ pkgi_themes.txt
```

## Q/A

### Why is there less items in `pkgi_*.txt` than `PSP_*.tsv`?!
This is because some items are missing important values like `PKG direct link`. Keeping these would not make much sense since you would not be able to obtain these.

## Content types

| Type value | Content type | DB File           |
| ---------- | ------------ | ----------------- |
| 1          | Game         | `pkgi_games.txt`  |
| 2          | DLC          | `pkgi_dlcs.txt`   |
| 3          | Theme        | `pkgi_themes.txt` |

## pkgiPSP NoPayStation Mapping
This is the current mppaing of values.

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


## NoPayStation shenanigans
Sometimes `PKG direct link` is marked as `MISSING`. When running the CLI, it will filter out these items.

Example of a missing title:
| Title ID  | Region | Type | Name                              | PKG direct link | Content ID | Last Modification Date | RAP Download | .RAP file | File Size | SHA256 |
| --------- | ------ | ---- | --------------------------------- | --------------- | ---------- | ---------------------- | ------------ | --------- | --------- | ------ |
| NPJH50040 | JP     | PSP  | ペルソナ３ポータブル PSP the Best | MISSING         |
