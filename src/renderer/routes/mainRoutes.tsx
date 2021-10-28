import OnGoingPage from '../views/OnGoing/OnGoingPage';
import Test1Page from '../views/Test/TestPage1';
import Test2Page from '../views/Test/TestPage2';
const mainRoutes = [
	{
		path: '/test1',
		component: Test1Page,
	},
	{
		path: '/test2',
		component: Test2Page,
	},
	{
		path: '/',
		component: OnGoingPage,
	},
];

export default mainRoutes;
