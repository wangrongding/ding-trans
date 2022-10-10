# ding-trans

一个在终端上翻译的工具，支持有道翻译和 DeepL 翻译。

方便自己在编码、查看源码是直接在 VsCode 集成终端上翻译。减少来回切换窗口的操作。提升效率，时间为王！

## 安装-Install

```
npm i ding-trans -g
```

## 使用-Usage

### 新增 deepl（中英互译，吊打其他翻译，基于深度学习）

```sh
dd <content>
# eg.
dd hello world
```

翻译专业词汇的表现：  
![](https://assets.fedtop.com/picbed/20220706142743.png)

内容中如果标点符号比较多的时候，可以使用 引号 包裹起来，这样可以提高翻译的准确率。

![](https://assets.fedtop.com/picbed/20220706143047.png)

### 支持单词与长句的发音:

```shell
dd hello -S
dd hello --say
dd better late than never -S
dd better late than never --say
```

![](https://assets.fedtop.com/picbed/202210101726508.png)

### 查单词:

```shell
ding hello
```

![](https://assets.fedtop.com/picbed/202210101723582.png)

### 查长短句:

```shell
ding better late than never
```

![](https://assets.fedtop.com/picbed/202210101724090.png)

### 中译英:

```shell
ding JavaScript是最好的语言!
```

![](https://assets.fedtop.com/picbed/202210101724481.png)

### 更多提效的工具?

More tools to improve efficiency？

follow me on [GitHub](https://github.com/wangrongding)
