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
		component: Test1Page,
	},
];

export default mainRoutes;
