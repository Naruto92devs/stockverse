import { MembershipProvider } from '@/context/MembershipContext';
import { SearchHistoryProvider } from '@/context/SearchHistoryContext';
import { UserInfoProvider } from '@/context/UserContext';
import { WatchlistProvider } from '@/context/WatchlistContext';

const UserProvider = ({ children }) => {
    return (
      <UserInfoProvider>
        <WatchlistProvider>
          <MembershipProvider>
              <SearchHistoryProvider>
                  {children}
              </SearchHistoryProvider>
          </MembershipProvider>
        </WatchlistProvider>
      </UserInfoProvider>
    );
};

export default UserProvider;
