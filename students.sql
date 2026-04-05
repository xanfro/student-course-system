-- 创建学生表
CREATE TABLE IF NOT EXISTS student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    age INT NOT NULL COMMENT '年龄',
    gender ENUM('男', '女') NOT NULL COMMENT '性别',
    major VARCHAR(255) NOT NULL COMMENT '专业',
    grade VARCHAR(50) NOT NULL COMMENT '年级',
    gpa DECIMAL(3, 2) NOT NULL COMMENT 'GPA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入初始数据
INSERT INTO student (id, name, age, gender, major, grade, gpa) VALUES
(1, '张三', 20, '男', '计算科学', '大三', 3.5),
(2, '李四', 21, '女', '软件工程', '大二', 3.7),
(3, '王五', 22, '男', '人工智能', '大四', 3.8),
(4, '赵六', 19, '女', '数据科学', '大一', 3.6),
(5, '钱七', 20, '男', '网络安全', '大三', 3.4),
(6, '孙八', 21, '女', '信息安全', '大二', 3.6),
(7, '周九', 22, '男', '计算机科学', '大四', 3.9),
(8, '吴十', 19, '女', '软件工程', '大一', 3.5),
(9, '郑十一', 20, '男', '网络工程', '大三', 3.6),
(10, '冯十二', 21, '女', '数据科学', '大二', 3.7),
(11, '陈十三', 22, '男', '人工智能', '大四', 3.8);
