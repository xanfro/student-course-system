-- 创建课程表
CREATE TABLE IF NOT EXISTS course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT '课程名称',
    credits INT NOT NULL COMMENT '学分',
    instructor VARCHAR(100) NOT NULL COMMENT '任课教师',
    schedule VARCHAR(255) NOT NULL COMMENT '上课时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入初始数据
INSERT INTO course (id, name, credits, instructor, schedule) VALUES
(1, '计算机科学导论', 3, '张教授', '周一 9:00-11:00'),
(2, '数据结构与算法', 4, '李教授', '周二 14:00-16:00'),
(3, '操作系统原理', 4, '王教授', '周三 10:00-12:00'),
(4, '数据库系统概论', 3, '赵教授', '周四 13:00-15:00'),
(5, '计算机网络', 3, '钱教授', '周五 9:00-11:00'),
(6, '人工智能基础', 4, '孙教授', '周一 14:00-16:00'),
(7, '软件工程导论', 3, '周教授', '周二 9:00-11:00'),
(8, '编译原理', 4, '吴教授', '周三 14:00-16:00'),
(9, '计算机安全', 3, '郑教授', '周四 10:00-12:00'),
(10, '人机交互设计', 3, '冯教授', '周五 13:00-15:00');
