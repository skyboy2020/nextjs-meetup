import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

//getStaticPaths和getStaticProps配合使用
//获取动态路由参数路由路径
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    //fallback 退路的三种值
    //true : 没有生成静态路由页面id的，请求到来时动态生成，先返回空页面
    //false : 表示定义了所有页面路径，对于没有生成静态路由页面的，请求到来显示404页面    
    //'blocking' : 动态生成没有预生成的页面，当路由到来时，阻塞直到生成为止
    /*
    现在真和阻塞之间的区别在于，

      如果为 true，它将立即返回一个空页面，

      然后下拉动态生成的内容

      一旦完成。

      所以你需要处理这种情况

      该页面还没有数据。

      使用阻塞，用户将看不到任何东西，直到

      该页面是预先生成的，

      并且完成的页面将被提供。

      这就是我将在这里使用的方法，

      因为它不需要我们做任何其他额外的工作。

      因此，如果我们将后备更改为阻塞，

      我们将不再面临这个问题。

      现在我们只需要重新部署它。

      为此，我们所要做的就是创造 
    */
    fallback: 'blocking',
    //提取meetupId数组 根据由meetupId数组，生成静态路由页面
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
