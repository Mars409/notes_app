import { Layout, Typography, Carousel, Card, Button, Input } from 'antd';
import Navbar from '@/components/Navbar';
import { useStore } from '@/store/userStore';
import moment from'moment';
import './Home.css'; 

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Search } = Input;

const Home = () => {
  const { user } = useStore();

  const carouselData = [
    {
      title: '高效记录技巧',
      content: '掌握这些技巧，让你的笔记更有条理。',
      img: '/photo1.jpg', 
    },
    {
      title: '分类管理秘籍',
      content: '学会分类，轻松查找笔记。',
      img: '/photo2.jpg',
    },
    {
      title: '快速搜索方法',
      content: '利用强大的搜索功能，迅速找到所需笔记。',
      img: '/photo3.jpg',
    },
  ];

  const hotCategories = [
    {
      id: 1,
      name: '工作',
      description: '记录工作相关的重要事项和进展',
    },
    {
      id: 2,
      name: '学习',
      description: '整理学习资料和心得',
    },
    {
      id: 3,
      name: '生活',
      description: '记录生活中的美好瞬间和日常琐事',
    },
  ];

  const latestNotes = [
    {
      id: 1,
      title: '今日工作汇报',
      content: '总结今日工作成果与问题...',
      createTime: new Date(),
    },
    {
      id: 2,
      title: '学习Python心得',
      content: '分享学习Python过程中的收获...',
      createTime: new Date(),
    },
    {
      id: 3,
      title: '周末出游计划',
      content: '规划周末的出游路线和活动安排...',
      createTime: new Date(),
    },
  ];

  return (
    <Layout>
      <Navbar />
      <Content className="p-6">
        {user? (
          <Title level={2}>欢迎, {user.nickname || user.username}</Title>
        ) : (
          <Title level={2}>欢迎来到笔记应用</Title>
        )}
        {/* 搜索框 */}
        <Search
          placeholder="输入关键词搜索笔记"
          allowClear
          enterButton="搜索"
          size="large"
          style={{ marginBottom: '20px' }}
        />
        {/* 轮播图部分 */}
        <div className="carousel-container">
          <Carousel autoplay>
            {carouselData.map((item, index) => (
              <div key={index} className="carousel-item">
                <img src={item.img} alt={item.title} style={{ width: '100%' }} />
                <div className="carousel-caption">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 热门分类部分 */}
        <div className="hot-categories">
          <Title level={3}>热门分类</Title>
          <div className="category-list">
            {hotCategories.map((category) => (
              <Card
                key={category.id}
                title={category.name}
                bordered={false}
                hoverable
                className="category-card"
              >
                <Paragraph>{category.description}</Paragraph>
                <Button type="link" className="category-button">
                  查看更多
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* 最新笔记部分 */}
        <div className="latest-notes">
          <Title level={3}>最新笔记</Title>
          <div className="note-list">
            {latestNotes.map((note) => (
              <Card
                key={note.id}
                title={note.title}
                bordered={false}
                hoverable
                className="note-card"
              >
                <Paragraph>{note.content.substring(0, 50) + '...'}</Paragraph>
                <Paragraph className="note-time">
                  创建时间：{moment(note.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </Paragraph>
                <Button type="link" className="note-button">
                  查看详情
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;