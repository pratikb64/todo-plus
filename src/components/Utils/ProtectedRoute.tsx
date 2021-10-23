import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { LoadingModal } from "..";
import { RootState } from "../../redux/store";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth.authState)

	if (isLoading) {
		return <LoadingModal />
	}

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
}

export default ProtectedRoute;
