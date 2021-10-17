import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../redux/store";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { authenticated } = useSelector((state: RootState) => state.auth.authState)
	return (
		<Route
			{...restOfProps}
			render={(props) =>
				authenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
}

export default ProtectedRoute;
