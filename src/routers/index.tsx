import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Layout } from "@/components";
import { AppRoutes } from "@/constants";

const BankCardPage = lazy(() => import("@/pages/BankCardPage/BankCardPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage/ContactsPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage/ErrorPage"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));
const TimelinePage = lazy(() => import("@/pages/TimelinePage/TimelinePage"));

export const MainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path={AppRoutes.HOME} errorElement={<ErrorPage />}>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={AppRoutes.TIMELINE} element={<TimelinePage />} />
                <Route path={AppRoutes.BANK_CARD} element={<BankCardPage />} />
                <Route path={AppRoutes.CONTACTS} element={<ContactsPage />} />
            </Route>
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
    )
);
