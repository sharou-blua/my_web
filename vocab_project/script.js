<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Học Từ Vựng</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* CSS tích hợp để tránh lỗi liên kết */
        :root {
            --primary-color: #4A90E2;
            --secondary-color: #50E3C2;
            --background-start: #FBC2EB;
            --background-end: #A6C1EE;
            --text-color: #333;
            --nav-bg: #4A90E2;
            --nav-text: white;
            --card-bg: white;
            --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* --- Reset cơ bản --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, var(--background-start), var(--background-end));
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }

        /* Thanh điều hướng (Navbar) */
        nav {
            width: 100%;
            max-width: 900px;
            background-color: var(--nav-bg);
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        nav ul {
            list-style: none;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        nav ul li a {
            color: var(--nav-text);
            text-decoration: none;
            font-weight: 500;
            font-size: 1.1em;
            padding: 10px 15px;
            border-radius: 8px;
            transition: background-color 0.3s, transform 0.2s;
            display: block;
        }

        nav ul li a:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        /* Nội dung chính */
        .content {
            width: 100%;
            max-width: 900px;
            background-color: var(--card-bg);
            padding: 40px;
            border-radius: 12px;
            box-shadow: var(--card-shadow);
            text-align: center;
        }

        h1 {
            color: var(--primary-color);
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        p {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .sticker {
            margin-top: 30px;
        }

        .sticker img {
            max-width: 180px;
            height: auto;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        @media (max-width: 600px) {
            nav ul li a {
                font-size: 1em;
                padding: 8px 10px;
            }

            .content {
                padding: 20px;
            }

            h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <nav>
        <ul>
            <li><a href="index.html">🏠 Trang chủ</a></li>
            <li><a href="lessons.html">📘 Bài học</a></li>
            <li><a href="games.html">🎮 Trò chơi</a></li>
            <li><a href="discuss.html">💬 Thảo luận</a></li>
            <li><a href="status.html">📊 Thống kê</a></li>
        </ul>
    </nav>

    <div class="content">
        <h1>🎉 Chào mừng đến với Trang Học Từ Vựng! 🎉</h1>
        <p>Chào mừng bạn đến với trung tâm học từ vựng! Hãy khám phá các bài học và trò chơi thú vị.</p>
        <div class="sticker">
            <img src="https://placehold.co/200x200/50E3C2/FFFFFF?text=Sticker+1" alt="Sticker vui nhộn 1">
            <img src="https://placehold.co/200x200/4A90E2/FFFFFF?text=Sticker+2" alt="Sticker vui nhộn 2">
        </div>
    </div>
</body>
</html>
