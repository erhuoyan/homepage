import time
from io import BytesIO

import requests
from PIL import Image


def download_image(api_url, save_dir, filename, session, agent, quality, max_size=(2560, 1440)):
    headers = {
        "User-Agent": agent
    }
    # 发送GET请求
    try:
        response = session.get(api_url, headers=headers, timeout=50)
        # 检查响应状态码
        if response.status_code != 200:
            raise Exception("Failed to download image")

        # 保存图片
        image = Image.open(BytesIO(response.content))
        # 将图片转换为RGB模式（如果需要）
        if image.mode != 'RGB':
            image = image.convert('RGB')

        output = BytesIO()

        image.thumbnail(max_size, Image.LANCZOS)
        image.save(output, 'WEBP', quality=quality)
        output.seek(0)

        # 将处理后的图片保存到文件
        save_path = save_dir + '/' + filename
        with open(save_path, 'wb') as f:
            f.write(output.read())
        print(f"图片已保存到 {save_path}")

    except requests.Timeout:
        print("Request timed out")
    except requests.RequestException as e:
        print("An error occurred:", e)


if __name__ == "__main__":
    api_url_pc = "https://t.alcy.cc/ycy"
    api_url_m = "https://t.alcy.cc/aimp"
    # save_dir = "./img"  # 替换为你的保存目录
    save_dir = "../assets/img"  # 替换为你的保存目录

    # 设置移动端的User-Agent
    mobile_user_agent = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    # 设置PC端的User-Agent
    chrome_user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

    # 创建一个Session对象
    session = requests.Session()

    for index in range(10):
        filename = index.__str__() + 'm.webp'
        download_image(api_url_m, save_dir, filename, session, mobile_user_agent, 65, max_size=(2560, 1440))
        time.sleep(1)

    for index in range(10):
        filename = index.__str__() + 'pc.webp'
        download_image(api_url_pc, save_dir, filename, session, chrome_user_agent, 75, max_size=(2560, 1440))
        time.sleep(1)
