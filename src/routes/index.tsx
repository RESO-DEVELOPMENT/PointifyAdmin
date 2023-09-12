import BlogNewPost from 'pages/dashboard/BlogNewPost';
// static
import BlogPost from 'pages/dashboard/BlogPost';
// layouts
import BlogPosts from 'pages/dashboard/BlogPosts';
import DashBoardReport from 'pages/report/DashBoardReport';
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// path
import PromotionDash from 'pages/dashboard/PromotionSystemDashboard';
import ActionPage from 'pages/promotionEngine/Action';
import NewActionPage from 'pages/promotionEngine/Action/create';
import ConditionPage from 'pages/promotionEngine/Condition';
import NewCondition from 'pages/promotionEngine/Condition/createCondition';
import ProfilePage from 'pages/promotionEngine/Configuration/profile';
import SettingPage from 'pages/promotionEngine/Configuration/settings';
import GiftPage from 'pages/promotionEngine/Gift';
import NewGiftPage from 'pages/promotionEngine/Gift/create';
import Promotion from 'pages/promotionEngine/Promotion';
import CreatePromotion from 'pages/promotionEngine/Promotion/CreatePromotion';
import Voucher from 'pages/promotionEngine/Voucher';
import CreateVoucher from 'pages/promotionEngine/Voucher/createVoucher';
import Insights from 'pages/report/Insights';
import DateReport from 'pages/report/TradingReport/DateReport';
import MonthReport from 'pages/report/TradingReport/MonthReport';
import TimeReport from 'pages/report/TradingReport/TimeReport';

// import ReportGeneralApp from 'pages/report/GeneralReport/GeneralApp';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'products',
          children: [
            { path: '', element: <Products /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'combos',
          children: [
            { path: '', element: <ComboListPage /> },
            { path: 'new', element: <CreateComboPage /> },
            { path: ':comboId', element: <UpdateComboPage /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'collections',
          children: [
            { path: '', element: <CollectionListPage /> },
            { path: 'new', element: <CreateCollectionPage /> },
            { path: ':id', element: <UpdateCollectionPage /> }
          ]
        },
        {
          path: 'categories',
          children: [
            { path: 'extra', element: <CategoryListPage isExtra /> },
            { path: '', element: <CategoryListPage /> },
            { path: 'new', element: <CreateCategoryPage /> },
            { path: ':id', element: <UpdateCategoryPage /> }
          ]
        },
        {
          path: 'menus',
          children: [
            { path: '', element: <MenusPage /> },
            { path: ':id', element: <UpdateMenuPage /> }
          ]
        },
        { path: 'menu-in-store', element: <MenuInStorePage /> },
        {
          path: 'customers',
          children: [
            { path: '', element: <CustomerListPage /> },
            { path: 'new', element: <ComingSoon /> }
          ]
        },
        // {
        //   path: 'stores',
        //   children: [
        //     { path: '', element: <StoreListPage /> },
        //     {
        //       path: 'new',
        //       element: <CreateStorePage />
        //     },
        //     { path: ':id', element: <UpdateStorePage /> }
        //   ]
        // },
        {
          path: 'log',
          children: [{ path: '', element: <LogPage /> }]
        },
        {
          path: 'stores',
          children: [{ path: '', element: <StoreReport /> }]
        }
      ]
    },
    // Report system Routes
    {
      path: 'report',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashBoardReport />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="0/home" replace /> },
        {
          path: ':storeId',
          children: [
            // { path: '', element: <Navigate to="dashboard" replace /> },
            {
              path: 'home',
              element: <HomePage />
            },
            {
              path: 'insights',
              element: <Insights />
            },
            // { path: 'dashboard', element: <ReportDashboard /> },
            {
              path: 'overview-date',
              element: <OverviewDate />
            },
            {
              path: 'overview-month',
              element: <OverviewMonth />
            },
            {
              path: 'payment',
              children: [{ path: '', element: <PaymentReport /> }]
            },
            {
              path: 'product-progress',
              children: [{ path: '', element: <ProductProgressReport /> }]
            },
            {
              path: 'product-sale',
              children: [{ path: '', element: <ProductSaleReport /> }]
            },
            {
              path: 'day-report',
              children: [
                { path: '', element: <DayReport /> },
                { path: 'time-report', element: <TimeReport /> },
                { path: 'date-report', element: <DateReport /> },
                { path: 'month-report', element: <MonthReport /> }
              ]
            },
            {
              path: 'promotion',
              children: [{ path: '', element: <PromotionReport /> }]
            },
            {
              path: 'stores',
              children: [{ path: '', element: <StoreReport /> }]
            }
          ]
        }
      ]
    },
    // Promotion system Routes
    {
      path: 'promotion-system',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashBoardReport />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/promotion-system/app" replace /> },
        { path: 'app', element: <PromotionDash /> },
        {
          path: 'promotion',
          children: [
            { path: '', element: <Promotion /> },
            { path: 'new', element: <CreatePromotion /> }
          ]
        },
        {
          path: 'voucher',
          children: [
            { path: '', element: <Voucher /> },
            { path: 'new', element: <CreateVoucher /> }
          ]
        },
        {
          path: 'condition',
          children: [
            { path: '', element: <ConditionPage /> },
            { path: 'new', element: <NewCondition /> }
          ]
        },
        {
          path: 'action',
          children: [
            { path: '', element: <ActionPage /> },
            { path: 'new', element: <NewActionPage /> }
          ]
        },
        {
          path: 'gift',
          children: [
            { path: '', element: <GiftPage /> },
            { path: 'new', element: <NewGiftPage /> }
          ]
        },
        {
          path: 'setting',
          children: [{ path: '', element: <SettingPage /> }]
        },
        {
          path: 'profile',
          children: [{ path: '', element: <ProfilePage /> }]
        }
      ]
    },
    // FOR STORE ADMIN
    {
      path: 'store-admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['store-admin']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/store-admin/orders" replace /> },
        { path: 'reportDashboard', element: <></> },

        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'menus',
          element: <MenuStoreManagementPage />
        }
      ]
    },

    {
      path: '/',
      element: <Navigate to="/auth/login" replace />
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
// const ReportDashboard = Loadable(lazy(() => import('../pages/dashboard/ReportDashboard')));
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const Products = Loadable(lazy(() => import('../pages/Products/Products')));
const UpdateProduct = Loadable(lazy(() => import('../pages/Products/UpdateProduct')));
const CreateProduct = Loadable(lazy(() => import('../pages/Products/create')));

// Menu
const DayReport = Loadable(lazy(() => import('../pages/report/TradingReport')));
const MenusPage = Loadable(lazy(() => import('../pages/Menus')));
const UpdateMenuPage = Loadable(lazy(() => import('../pages/Menus/update')));
const MenuInStorePage = Loadable(lazy(() => import('../pages/Menus/MenuInStore')));

// Collection
const CollectionListPage = Loadable(lazy(() => import('../pages/collections')));
const UpdateCollectionPage = Loadable(lazy(() => import('../pages/collections/update')));
const CreateCollectionPage = Loadable(lazy(() => import('../pages/collections/create')));

// Store
const PromotionReport = Loadable(lazy(() => import('../pages/report/PromotionReport')));
const CreateStorePage = Loadable(lazy(() => import('../pages/Stores/create')));
const UpdateStorePage = Loadable(lazy(() => import('../pages/Stores/update')));

// Store-Order
const OrderListPage = Loadable(lazy(() => import('../pages/Orders/OrderList')));
const MenuStoreManagementPage = Loadable(lazy(() => import('../pages/Orders/MenuOfStore')));

// Categories
const CategoryListPage = Loadable(lazy(() => import('../pages/Categories')));
const CreateCategoryPage = Loadable(lazy(() => import('../pages/Categories/CreateCategory')));
const UpdateCategoryPage = Loadable(lazy(() => import('../pages/Categories/UpdateCategory')));

// customers
const CustomerListPage = Loadable(lazy(() => import('../pages/Customer/CustomerListPage')));

// combos
const ComboListPage = Loadable(lazy(() => import('../pages/Products/Combos/ComboList')));
const CreateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/CreateCombo')));
const UpdateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/UpdateCombo')));

//log
const LogPage = Loadable(lazy(() => import('../pages/Log')));

// report
const OverviewDate = Loadable(lazy(() => import('../pages/report/Overview/OverviewDate')));
const OverviewMonth = Loadable(lazy(() => import('../pages/report/Overview/OverviewMonth')));
const ProductSaleReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductSaleReport'))
);
const ProductProgressReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductProgressReport'))
);
const PaymentReport = Loadable(lazy(() => import('../pages/report/PaymentReport')));
const StoreReport = Loadable(lazy(() => import('../pages/report/StoreReport')));
const HomePage = Loadable(lazy(() => import('../pages/report/Home')));

// Promotion system
// const PromotionDash = Loadable(lazy(() => import('../pages/dashboard/PromotionSystemDashboard')));
// const PromotionPage = Loadable(lazy(() => import('../pages/promotionEngine/Promotion')));
// const NewPromotionPage = Loadable(
//   lazy(() => import('../pages/promotionEngine//Promotion/CreatePromotion'))
// );
// const VoucherPage = Loadable(lazy(() => import('../pages/promotionEngine/Voucher')));
// const NewVoucherPage = Loadable(
//   lazy(() => import('../pages/promotionEngine/Voucher/createVoucher'))
// );
// const ConditionPage = Loadable(lazy(() => import('../pages/promotionEngine/Condition')));
// const NewConditon = Loadable(lazy(() => import('../pages/promotionEngine/Condition/NewCondition')));
// const ActionPage = Loadable(lazy(() => import('../pages/promotionEngine/Action')));
// const NewActionPage = Loadable(lazy(() => import('../pages/promotionEngine/Action/create')));
// const GiftPage = Loadable(lazy(() => import('../pages/promotionEngine/Gift')));
// const NewGiftPage = Loadable(lazy(() => import('../pages/promotionEngine/Gift/create')));
// const SettingPage = Loadable(lazy(() => import('../pages/promotionEngine/Configuration/settings')));
// const ProfilePage = Loadable(lazy(() => import('../pages/promotionEngine/Configuration/profile')));
