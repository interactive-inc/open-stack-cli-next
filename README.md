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
bun install
```

## 開発

```bash
bun run dev
```

## ビルド

```bash
bun run build
```

以下がビルドされます：
1. Next.jsアプリ → `.next/`
2. CLI → `bin/hello.js`

## ローカル開発用のコマンドインストール

ビルド後、`bun link`でローカルに`hello`コマンドをインストールできます：

```bash
# ビルド
bun run build

# グローバルにリンク
bun link

# これで hello コマンドが使えます
hello --help
hello -p 8080 -m "Test"
```

アンインストール：

```bash
bun unlink
```

**仕組み：**
- `bun link`は、パッケージをグローバルな場所にシンボリックリンクします
- `package.json`の`bin`フィールドに基づいて`hello`コマンドが作成されます
- ソースコードを変更してビルドすると、自動的に反映されます（リンクなので）

開発中は、変更 → ビルド → すぐにテストできて便利です。

## CLIの実行

```bash
# ヘルプを表示
bun cli.ts --help

# デフォルト設定（ポート3000、"Hello, World!"）
bun cli.ts

# カスタムポート
bun cli.ts -p 8080

# カスタムメッセージ
bun cli.ts -m "Welcome!"

# カスタムポートとメッセージ
bun cli.ts -p 8080 -m "Custom message"

# バージョン表示
bun cli.ts --version
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
