import Layout from "components/layout";
import LoggedInState from "components/pages/profile/LoggedInState";
import UnauthedState from "components/pages/profile/UnauthedState";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user)
    return (
      <Layout>
        <LoggedInState />
      </Layout>
    );

  return (
    <Layout>
      <UnauthedState />
    </Layout>
  );
};

export default Profile;
