import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { AppRoutes } from "@/constants";
import { Layout } from "@/containers";

const BankCardPage = lazy(() => import("@/pages/BankCardPage/bankCardPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage/contactsPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage/errorPage"));
const HomePage = lazy(() => import("@/pages/HomePage/homePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/notFoundPage"));
const TimeLinePage = lazy(() => import("@/pages/TimeLinePage/timeLinePage"));

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path={AppRoutes.HOME} errorElement={<ErrorPage />}>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={AppRoutes.TIMELINE} element={<TimeLinePage />} />
                <Route path={AppRoutes.BANK_CARD} element={<BankCardPage />} />
                <Route path={AppRoutes.CONTACTS} element={<ContactsPage />} />
            </Route>
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
    )
);
