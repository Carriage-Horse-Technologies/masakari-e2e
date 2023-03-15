# QA Tool

このリポジトリで管理しているツールは本番環境が正常に動作しているか検証するための物です。

**Mac OSでの動作確認はまだ行えていません**

## how to setup

installing required packages (Ubuntu22.04)

```bash
sudo apt update && sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## how to use

```bash
yarn install
yarn e2e-run
```

## 参考

- https://dev.to/chis0m/installing-puppeteer-on-an-ubuntu-aws-ec2-instance-5o7
- https://blog.ijoru.com/2021/04/09/post-72/