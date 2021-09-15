# dserve ⚡️

**a CLI tool to serve files and dirs on HTTP(s) inspired by miniserve**

you can install dserve, and immediately you can host your local files on
HTTP(s). !

## How to use

### install

```bash
$ deno run -A --unstable https://deno.land/x/dserve/src/install.ts
```

### serve current directory

```bash
$ dserve .
```

### serve with TLS

```bash
$ dserve --tls-cert {your tls cert path} --tls-key {your tls key path} .
```

### help

```bash
$ dserve --help
```

## Feature ✨

- easy to use
- if you installed deno on your machine, you can install this with one command
- Serve with Correct MIME type
- show index of files in directory
- serve with TLS

## RoadMap for v1.0.0 🚚

- [ ] File Uploading
- [ ] download with zip
- [ ] Basic Auth
- [ ] Scan with QR Code

## Usage

```bash
$ dserve --help

dserve@0.0.1
Developed by Shinobu Hayashi/Shinyaigeek <me@shinyaigeek.dev>

Usage
    dserve [Flags] [Options] [--] [Path]

Flags
    -h --help [Bool]
        Show this help message

Options
    -p, --port [Number]
        Port number to listen to. default 3030
    -t, --title [String]
        Title of the page. default "dserve"
    -i, --index [String]
        Index file to serve. optional
        --tls-cert [String]
        TLS certificate file. optional. if both of --tls-key and --tls-cert are specified, dserve will use TLS.
        --tls-key [String]
        TLS key file. optional. if both of --tls-key and --tls-cert are specified, dserve will use TLS.
    
Args
    <Path>
        Path to serve. default "."
```
