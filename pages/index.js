import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

/*

  getServerSideProps 更好还是 getStaticProps 更好？

  getServerSideProps 可能听起来更好

  因为它保证为每个请求运行。

  但这实际上可能是一个缺点，

  因为这意味着你需要等待你的页面

  在每个传入的请求上生成。

  现在，如果你没有一直在变化的数据，

  有了这个，我的意思是

  它每秒更改多次。

  如果您不需要访问请求对象，

  假设进行身份验证，

  getStaticProps 实际上更好。

  因为您在那里预先生成了一个 HTML 文件，

  然后可以通过 CDN 存储和提供该文件。

  这简直比再生更快

  并为每个传入请求获取该数据。

  所以你的页面在工作时会更快

  使用 getStaticProps，因为那样它可以被缓存

  并重复使用，而不是一直重新生成。

  因此，你真的应该只使用 getServerSideProps

  如果您需要访问该具体请求对象，

  因为你无权请求

  并在 getStaticProps 中响应。

  或者如果你真的有数据

  每秒变化多次，

  那么因此即使重新验证也无济于事，

  那么 getServerSideProps 是一个不错的选择。

  不过，现在这里是我们的聚会清单，

  这不是一个很好的选择，因为那不是数据，

  经常变化。

  在这里我也不需要工作

  与传入的请求。

  因此，我将再次评论 getServerSideprops，

  并评论 getStaticProps 。

  因为这样，我们可以利用缓存

  而且我们不会多次重新生成页面，

  不必要的。

*/ 
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

//async 异步执行
export async function getStaticProps(context) {
  //服务器端静态生成页面 安全
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //增量静态生成
    //每隔1秒重新生成一次页面
    // 这意味着这个页面，重新验证设置为 1，

    // 将在服务器上重新生成

    // 如果有请求进入，至少每 1 秒

    // 对于这个页面。

    // 然后这些重新生成的页面

    // 将替换旧的预生成页面。

    // 这样，您将确保您的数据

    // 永远不会超过 1 秒。
    revalidate: 1,
  };
}

export default HomePage;
