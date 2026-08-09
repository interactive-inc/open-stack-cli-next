# Open Stack CLI (Next.js)

これは[Next.js](https://nextjs.org/docs)のWebアプリを起動するCLIの開発環境です。

## 構成

```
.
├── bin/                 # ビルド済みCLI（生成ファイル）
├── .next/               # Next.jsビルド（生成ファイル）
├── cli.ts               # CLIエントリーポイント
└── tsup.config.ts       # ビルド設定
```

## インストール

```bash
vp install
```

## 開発

```bash
vp run dev
```

## ビルド

```bash
vp run build
```

以下がビルドされます。

1. Next.jsアプリ → `.next/`
2. CLI → `bin/hello.js`

## ローカル開発用のコマンドインストール

ビルド後、`vp link` でローカルに `hello` コマンドをインストールできます。

```bash
# ビルド
vp run build

# グローバルにリンク
vp link

# これで hello コマンドが使えます
hello --help
hello -p 8080 -m "Test"
```

アンインストール：

```bash
vp unlink
```

**仕組み：**

- `vp link` は、パッケージをグローバルな場所にシンボリックリンクします
- `package.json`の`bin`フィールドに基づいて`hello`コマンドが作成されます
- ソースコードを変更してビルドすると、自動的に反映されます（リンクなので）

## 検証

```bash
vp lint
vp fmt
vp test
vp run check
```

## CLIの実行

```bash
# ヘルプを表示
vp run start -- --help

# デフォルト設定（ポート3000、"Hello, World!"）
vp run start

# カスタムポート
vp run start -- -p 8080

# カスタムメッセージ
vp run start -- -m "Welcome!"

# カスタムポートとメッセージ
vp run start -- -p 8080 -m "Custom message"

# バージョン表示
vp run start -- --version
```

**オプション：**

- `-p, --port <port>` - ポート番号（デフォルト：3000）
- `-m, --message <text>` - 表示するメッセージ（デフォルト："Hello, World!"）
- `-h, --help` - ヘルプを表示
- `-v, --version` - バージョンを表示

## 配布

package.jsonの`files`フィールドには以下のみが含まれます：

- `bin/` - ビルド済みCLI
- `.next/` - ビルド済みNext.jsアプリ（すべてのコードがバンドル済み）

ソースファイルは配布に不要です。
