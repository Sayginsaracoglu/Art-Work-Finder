import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import { isAuthenticated } from "../lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    updateAtoms();
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return <>{props.children}</>;
}
