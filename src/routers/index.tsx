import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Layout } from "@/components";
import { AppRoutes } from "@/constants";
import {
    BankCardPage,
    ContactsPage,
    ErrorPage,
    HomePage,
    NotFoundPage,
    TimelinePage,
} from "@/pages";

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
