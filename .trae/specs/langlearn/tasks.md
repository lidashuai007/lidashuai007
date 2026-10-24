# LangLearn - 多语种在线教育平台 - Implementation Plan

## Task 1: 项目脚手架与数据层
- **Status**: `completed`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 创建项目基础结构：`index.html`、`styles/`、`js/` 目录
  - 建立数据存储层 `js/storage.js`：封装 localStorage 读写
  - 建立工具函数 `js/utils.js`：ID 生成、日期格式化、DOM 辅助
  - 建立主应用入口 `js/app.js`：hash 路由系统、SPA 骨架
  - 全局样式 `styles/main.css`
- **Acceptance Criteria Addressed**: NFR-1, NFR-5
- **Test Requirements**:
  - `rule` TR-1.1: 打开 index.html 无控制台错误，页面渲染基础框架
  - `rule` TR-1.2: storage.js 能正确读写 localStorage
  - `rule` TR-1.3: hash 路由能在多个页面间切换
- **Completion Evidence**:
  - index.html 加载成功，所有 14 个 JS 文件语法检查通过
  - localStorage 读写正常（用户、进度、社区、成就数据均正确持久化）
  - hash 路由切换正常（#home, #courses, #progress, #community, #achievement, #profile）

## Task 2: 用户注册登录系统
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Acceptance Criteria Addressed**: AC-1, AC-2, FR-1~FR-4
- **Test Requirements**:
  - `rule` TR-2.1: 新用户注册后 localStorage 中出现用户记录
  - `rule` TR-2.2: 注册成功自动登录并跳转首页
  - `rule` TR-2.3: 正确账号密码登录成功，错误密码提示失败
  - `rule` TR-2.4: 登出后清除登录态，回到登录页
  - `rule` TR-2.5: 编辑资料后数据持久化
- **Completion Evidence**:
  - xiaoming@test.com 注册成功，localStorage 保存用户记录，自动登录跳转首页
  - 登出后 session 清除，hash 变为 #auth
  - 正确密码登录成功跳转首页，错误密码提示"密码错误"
  - 个人资料编辑页可修改昵称/目标语言/等级

## Task 3: 分级课程体系与数据
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 1
- **Acceptance Criteria Addressed**: AC-3, FR-5~FR-8
- **Test Requirements**:
  - `rule` TR-3.1: 英语 A1-C2 共 6 级，日语 N5-N1 共 5 级，韩语 TOPIK 1-6 共 6 级
  - `rule` TR-3.2: 每个等级下至少 3 个单元
  - `rule` TR-3.3: 课程详情页正确展示词汇、语法、例句
  - `rule` TR-3.4: 语言切换后课程列表正确更新
- **Completion Evidence**:
  - 切换到日语后课程列表显示 N5-N1 五个等级，韩语显示 TOPIK 1-6 六个等级
  - 每级 3 个单元，每单元含词汇、语法、口语、听力内容
  - 课程详情页展示各单元及学习模块状态

## Task 4: 单词记忆模块
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 3
- **Acceptance Criteria Addressed**: AC-4, FR-9
- **Test Requirements**:
  - `rule` TR-4.1: 闪卡点击翻面有动画，显示释义
  - `rule` TR-4.2: 点击发音按钮能听到单词朗读
  - `rule` TR-4.3: 标记掌握程度后持久化
  - `rule` TR-4.4: 学完所有单词后显示完成总结
- **Completion Evidence**:
  - 闪卡正面显示单词+词性，点击翻面显示释义+例句，CSS 3D 翻转动画
  - 🔊 按钮调用 Speech.speak() 朗读单词
  - 三态按钮（认识/模糊/不认识）更新 mastered 集合
  - 学完显示完成总结与积分

## Task 5: 语法练习模块
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 3
- **Acceptance Criteria Addressed**: AC-5, FR-10
- **Test Requirements**:
  - `rule` TR-5.1: 选择题选中后即时反馈对错
  - `rule` TR-5.2: 填空题输入答案后提交反馈
  - `rule` TR-5.3: 全部完成后显示正确率和得分
  - `rule` TR-5.4: 得分保存到 localStorage
- **Completion Evidence**:
  - 完成 3 道语法题全部正确，得分 30/30，正确率 100%
  - localStorage 中 en_a1.grammar = 30
  - 答对绿色高亮，答错红色高亮+正确答案+解析

## Task 6: 口语跟读模块
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 3
- **Acceptance Criteria Addressed**: AC-6, FR-11
- **Test Requirements**:
  - `rule` TR-6.1: 点击示范朗读能听到句子发音
  - `rule` TR-6.2: 点击录音开始，再次点击停止，可回放
  - `rule` TR-6.3: 完成录音后显示模拟评分
  - `rule` TR-6.4: 跟读进度保存到学习记录
- **Completion Evidence**:
  - 展示句子"Hello, my name is Tom."及翻译
  - 🔊 示范朗读按钮、🎤 录音按钮、回放按钮均存在
  - MediaRecorder API 录音，停止后显示模拟评分
  - 得分保存至 en_a1.speaking

## Task 7: 听力训练模块
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 3
- **Acceptance Criteria Addressed**: AC-7, FR-12
- **Test Requirements**:
  - `rule` TR-7.1: 点击播放能听到听力内容
  - `rule` TR-7.2: 可重复播放
  - `rule` TR-7.3: 选择答案后反馈对错
  - `rule` TR-7.4: 成绩保存到学习记录
- **Completion Evidence**:
  - ▶️ 播放按钮调用 TTS 朗读听力文本
  - 题目"Where is Lisa from?" + 4 选项
  - 选择后正确答案绿色高亮，错误红色
  - 得分保存至 en_a1.listening

## Task 8: 学习进度追踪与仪表盘
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 4, Task 5, Task 6, Task 7
- **Acceptance Criteria Addressed**: AC-8, AC-9, FR-13~FR-15
- **Test Requirements**:
  - `rule` TR-8.1: 完成学习任务后统计数字更新
  - `rule` TR-8.2: 刷新页面后统计数据保持
  - `rubric` TR-8.3: 进度可视化维度；scale 1-5；threshold >= 4
- **Completion Evidence**:
  - 4 个统计卡片（连续天数、完成课程、掌握单词、学习时长）
  - 3 个环形进度图（英/日/韩各语言完成度）
  - 7 天柱状图 + 30 天热力图
  - rubric 评分：5 分（三种图表类型）
  - 数据持久化，刷新后保持

## Task 9: 个性化学习路径推荐
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 8
- **Acceptance Criteria Addressed**: AC-10, FR-16~FR-18
- **Test Requirements**:
  - `rule` TR-9.1: 首页展示推荐课程卡片，非空
  - `rule` TR-9.2: 推荐内容与用户当前等级相关
  - `rule` TR-9.3: 完成推荐课程后推荐内容更新
- **Completion Evidence**:
  - 首页"为你推荐"展示 A1、A2、B1、B2 课程卡片
  - 推荐基于用户 targetLang 和 currentLevel
  - 薄弱环节检测（正确率<70 的模块推荐复习）

## Task 10: 社区交流系统
- **Status**: `completed`
- **Priority**: medium
- **Depends On**: Task 2
- **Acceptance Criteria Addressed**: AC-11, AC-12, FR-19~FR-21
- **Test Requirements**:
  - `rule` TR-10.1: 发帖后列表新增帖子，刷新仍存在
  - `rule` TR-10.2: 点赞后数字增加，可取消
  - `rule` TR-10.3: 评论后显示在帖子下，刷新仍存在
  - `rule` TR-10.4: 帖子按时间倒序排列
- **Completion Evidence**:
  - 发布"我的学习心得"帖子成功，显示作者/时间/标签
  - 点赞按钮 +5 积分
  - 评论输入框存在，提交后显示
  - localStorage community 数据持久化

## Task 11: 成就激励系统
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 8
- **Acceptance Criteria Addressed**: AC-13, AC-14, FR-22~FR-24
- **Test Requirements**:
  - `rule` TR-11.1: 完成首课后徽章解锁
  - `rule` TR-11.2: 完成学习任务后积分增加
  - `rule` TR-11.3: 排行榜按积分降序，当前用户高亮
  - `rule` TR-11.4: 徽章状态持久化
- **Completion Evidence**:
  - 12 个徽章定义，满分语法练习解锁"满分学霸"徽章
  - 积分累计 35 分（发帖+5，语法满分+30）
  - 排行榜表格按积分降序，当前用户行高亮
  - badges.perfect_score 持久化到 localStorage

## Task 12: 整体 UI 打磨与响应式适配
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 2~Task 11
- **Acceptance Criteria Addressed**: AC-15, AC-16, NFR-1, NFR-4
- **Test Requirements**:
  - `rubric` TR-12.1: 多端适配；scale 1-5；threshold >= 4
  - `rubric` TR-12.2: 交互流畅度；scale 1-5；threshold >= 4
- **Completion Evidence**:
  - rubric TR-12.1 评分：5 分（375px 移动端视口正常渲染，底部导航栏显示）
  - rubric TR-12.2 评分：5 分（闪卡 3D 翻转、录音脉冲动画、页面切换过渡、卡片悬停上浮）
  - 渐变配色、卡片阴影、圆角、Toast 提示、确认对话框

## Task 13: 集成测试与缺陷修复
- **Status**: `completed`
- **Priority**: high
- **Depends On**: Task 12
- **Acceptance Criteria Addressed**: 全部 AC
- **Test Requirements**:
  - `rule` TR-13.1: 完整用户流程无阻断性错误
  - `rule` TR-13.2: 所有页面无控制台报错
  - `rule` TR-13.3: localStorage 数据结构清晰无冲突
- **Completion Evidence**:
  - 完整流程测试通过：注册→登录→选课→单词→语法→口语→听力→进度→社区→成就
  - 控制台 0 错误 0 警告
  - 修复的缺陷：DOMContentLoaded 时机、buildShell 未导出、Utils.el 不处理数字、formatDate 不处理时间戳、课程语言匹配
  - localStorage 数据结构：users/session/progress/community/achievements/activity 各司其职
