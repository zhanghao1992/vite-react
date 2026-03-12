/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2026-03-12 09:38:48
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2026-03-12 09:39:11
 * @FilePath: /vite-react/src/pages/pgc/index.jsx
 * @Description: 学习教育任务配置页面
 */
import { useState } from 'react';
import {
  Card,
  Radio,
  Select,
  Button,
  Progress,
  Space,
  Divider,
} from 'antd';
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  BarsOutlined,
  EditOutlined,
  UserOutlined,
  SoundOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.less';

const Pgc = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [viewMode, setViewMode] = useState('current');

  // 第一排统计卡片数据
  const statCards = [
    { title: '全面启动部署', count: 3, icon: <PlayCircleOutlined />, color: '#dc2626' },
    { title: '开展学习讨论', count: 6, icon: <BarsOutlined />, color: '#dc2626' },
    { title: '从严查摆问题', count: 3, icon: <BarsOutlined />, color: '#dc2626' },
    { title: '开展整改政治', count: 3, icon: <EditOutlined />, color: '#dc2626' },
    { title: '做好建章立制', count: 6, icon: <UserOutlined />, color: '#dc2626' },
    { title: '坚持开门教育', count: 3, icon: <CheckCircleOutlined />, color: '#dc2626' },
    { title: '全面启动部署', count: 6, icon: <PlayCircleOutlined />, color: '#dc2626' },
  ];

  // 第二排状态卡片数据
  const statusCards = [
    { title: '已完成', count: 10, icon: <CheckCircleOutlined />, className: 'status-completed', bgColor: '#dcfce7', textColor: '#166534' },
    { title: '推进中', count: 10, icon: <ClockCircleOutlined />, className: 'status-progress', bgColor: '#dbeafe', textColor: '#1d4ed8' },
    { title: '拖期已完成', count: 10, icon: <WarningOutlined />, className: 'status-delayed-completed', bgColor: '#fef3c7', textColor: '#d97706' },
    { title: '拖期未完成', count: 10, icon: <ExclamationCircleOutlined />, className: 'status-delayed', bgColor: '#fee2e2', textColor: '#dc2626' },
    { title: '未开始', count: 10, icon: '○', className: 'status-not-started', bgColor: '#f3f4f6', textColor: '#6b7280' },
    { title: '截止目前参与党委数量', count: 65, icon: '', className: 'status-no-icon', bgColor: '#eff6ff', textColor: '#1d4ed8' },
    { title: '下级党委数量', count: 65, icon: '', className: 'status-no-icon', bgColor: '#eff6ff', textColor: '#1d4ed8' },
  ];

  // 任务数据
  const tasks = [
    {
      id: 12,
      title: '健全完善制度体系',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '结合领导干部"四航"计划，将习近平总书记关于树立和践行正确政绩观的重要论述纳入领导干部培养教育，融入领导干部成长全过程',
      progress: 46,
      additionalInfo: '启动部署完成率',
    },
    {
      id: 13,
      title: '健全有效防范和纠治政绩观偏差工作机制',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '依据有关上级文件精神，结合集团公司"三重一大"机制运行情况，动态优化、细化事项清单，调优决策程序，不断厘清决策边界，规范权力运行',
      progress: 65,
      additionalInfo: '"三重一大"事项清单修订清单数量',
    },
    {
      id: 14,
      title: '健全完善制度体系',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '结合领导干部"四航"计划，将习近平总书记关于树立和践行正确政绩观的重要论述纳入领导干部培养教育，融入领导干部成长全过程',
      progress: 46,
      additionalInfo: '启动部署完成率',
    },
    {
      id: 15,
      title: '健全有效防范和纠治政绩观偏差工作机制',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '依据有关上级文件精神，结合集团公司"三重一大"机制运行情况，动态优化、细化事项清单，调优决策程序，不断厘清决策边界，规范权力运行',
      progress: 65,
      additionalInfo: '"三重一大"事项清单修订清单数量',
    },
    {
      id: 16,
      title: '健全完善制度体系',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '结合领导干部"四航"计划，将习近平总书记关于树立和践行正确政绩观的重要论述纳入领导干部培养教育，融入领导干部成长全过程',
      progress: 0,
      additionalInfo: '',
    },
    {
      id: 17,
      title: '健全有效防范和纠治政绩观偏差工作机制',
      milestone: '里程碑数量：3',
      status: '进行中',
      description: '依据有关上级文件精神，结合集团公司"三重一大"机制运行情况，动态优化、细化事项清单，调优决策程序，不断厘清决策边界，规范权力运行',
      progress: 0,
      additionalInfo: '',
    },
  ];

  // 责任履行情况数据
  const organizationItems = [
    { number: 1, text: '召开党委常委会议10次' },
    { number: 2, text: '党建工作领导小组会10次' },
    { number: 3, text: '党建工作领导小组会10次' },
    { number: 4, text: '党建工作领导小组会10次' },
    { number: 5, text: '党建工作领导小组会10次' },
  ];

  const propagandaItems = [
    { number: 1, text: '开设专区专栏XX个' },
    { number: 2, text: '发布稿件XX个' },
    { number: 3, text: '先进典型选树XX个' },
  ];

  const verificationItems = [
    { number: 1, text: '开设专区专栏XX个' },
    { number: 2, text: '发布稿件XX个' },
    { number: 3, text: '先进典型选树XX个' },
  ];

  const focusItems = [
    { number: 1, text: '开设专区专栏XX个' },
    { number: 2, text: '发布稿件XX个' },
    { number: 3, text: '先进典型选树XX个' },
  ];

  return (
    <div className={styles.pgcContainer}>
      {/* 头部区域 */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.headerTop}>
            <div className={styles.titleSection}>
              <h1 className={styles.mainTitle}>学习教育任务配置</h1>
              <p className={styles.subtitle}>中国共产党中国第一汽车集团有限公司委员会</p>
              <p className={styles.welcomeText}>管理员陈平安，欢迎您！</p>
            </div>
            <Select
              className={styles.yearSelector}
              value={selectedYear}
              onChange={setSelectedYear}
              suffixIcon={null}
            >
              <Select.Option value="2026">2026年</Select.Option>
              <Select.Option value="2025">2025年</Select.Option>
              <Select.Option value="2024">2024年</Select.Option>
            </Select>
          </div>
          <div className={styles.headerActions}>
            <Space size={12}>
              <Button className={styles.btnOutline}>切换组织</Button>
              <Button className={styles.btnOutline}>配置重点工作分类</Button>
              <Button className={styles.btnOutline}>配置重点工作任务</Button>
              <Button className={styles.btnPrimary}>完成情况点检</Button>
            </Space>
          </div>
        </div>
      </div>

      {/* 视图选项 */}
      <div className={styles.viewOptions}>
        <Radio.Group value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <Radio value="current" className={styles.viewRadio}>仅看本级</Radio>
          <Radio value="subordinate" className={styles.viewRadio}>查看本级及下级</Radio>
        </Radio.Group>
      </div>

      {/* 主内容区域 */}
      <div className={styles.mainContent}>
        {/* 第一排统计卡片 */}
        <div className={styles.statsGrid}>
          {statCards.map((card, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statIcon} style={{ backgroundColor: card.color }}>
                  {card.icon}
                </div>
              </div>
              <div className={styles.statValue}>{card.count}</div>
              <div className={styles.statTitle}>{card.title}</div>
            </div>
          ))}
        </div>

        {/* 第二排状态卡片 */}
        <div className={styles.statsGrid}>
          {statusCards.map((card, index) => (
            <div
              key={index}
              className={`${styles.statusCard} ${styles[card.className]}`}
              style={{ backgroundColor: card.bgColor }}
            >
              {card.icon && (
                <div className={styles.statusIcon} style={{ color: card.textColor }}>
                  {card.icon}
                </div>
              )}
              <div className={styles.statusValue} style={{ color: card.textColor }}>{card.count}</div>
              <div className={styles.statusTitle} style={{ color: card.textColor }}>{card.title}</div>
            </div>
          ))}
        </div>

        {/* 任务推进情况 */}
        <div className={styles.taskSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleBar}></span>
            任务推进情况（21条）
          </h2>
          <div className={styles.tasksGrid}>
            {tasks.map((task, index) => (
              <Card key={index} className={styles.taskCard}>
                <div className={styles.taskHeader}>
                  <div className={styles.taskLeft}>
                    <span className={styles.taskId}>{task.id}</span>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskMilestone}>{task.milestone}</span>
                  </div>
                  <span className={styles.taskStatus}>{task.status}</span>
                </div>
                <p className={styles.taskDescription}>{task.description}</p>
                {task.progress > 0 && (
                  <>
                    <div className={styles.taskFooter}>
                      <div className={styles.taskInfo}>{task.additionalInfo}</div>
                      <div className={styles.taskProgressText}>{task.progress}%</div>
                    </div>
                    <Progress
                      percent={task.progress}
                      showInfo={false}
                      strokeColor="#dc2626"
                      className={styles.taskProgress}
                    />
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 底部区域 */}
        <div className={styles.bottomSection}>
          {/* 责任履行情况 */}
          <div className={styles.responsibilitySection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionTitleBar}></span>
              责任履行情况
            </h3>
            <div className={styles.responsibilityGrid}>
              <div className={styles.responsibilityColumn}>
                <div className={styles.columnHeader}>
                  <CheckCircleOutlined className={styles.columnIcon} style={{ color: '#22c55e' }} />
                  <span className={styles.columnTitle}>组织推进</span>
                </div>
                {organizationItems.map((item, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.itemNumber}>{item.number}</span>
                    <span className={styles.itemText}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className={styles.responsibilityColumn}>
                <div className={styles.columnHeader}>
                  <SoundOutlined className={styles.columnIcon} style={{ color: '#dc2626' }} />
                  <span className={styles.columnTitle}>宣传引导</span>
                </div>
                {propagandaItems.map((item, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.itemNumber}>{item.number}</span>
                    <span className={styles.itemText}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className={styles.responsibilityColumn}>
                <div className={styles.columnHeader}>
                  <CheckCircleOutlined className={styles.columnIcon} style={{ color: '#3b82f6' }} />
                  <span className={styles.columnTitle}>验证做法</span>
                </div>
                {verificationItems.map((item, index) => (
                  <div key={index} className={styles.listItem}>
                    <span className={styles.itemNumber}>{item.number}</span>
                    <span className={styles.itemText}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 重点关注事项 */}
          <div className={styles.focusSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionTitleBar}></span>
              重点关注事项
            </h3>
            <div className={styles.focusList}>
              <div className={styles.listHeader}>
                <ExclamationCircleOutlined className={styles.headerIcon} style={{ color: '#f59e0b' }} />
                <span className={styles.headerTitle}>事项清单</span>
              </div>
              {focusItems.map((item, index) => (
                <div key={index} className={styles.listItem}>
                  <span className={styles.itemNumber}>{item.number}</span>
                  <span className={styles.itemText}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pgc;
