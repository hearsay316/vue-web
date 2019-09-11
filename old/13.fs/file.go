package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	f, err := os.Open("./name.txt")
	if err != nil {
		fmt.Println("文件不存在")
	}
	defer f.Close()
	// 创建文件
	c, err := os.Create("./a.txt")
	if err != nil {
		fmt.Println("文件创建失败")
	}
	defer c.Close()
	buf := make([]byte, 3)
	for {
		n, err := f.Read(buf)
		if err != nil && err == io.EOF {
			fmt.Println("读取结束", n)
			return
		}
		w, err := c.Write(buf[:n])
		if err != nil {
			fmt.Println("err", err)
		}
		fmt.Println(w)
	}

}
