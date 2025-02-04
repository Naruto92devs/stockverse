import { EarningsCalendarProvider } from '@/context/EarningsCalendarContext';
import { InsiderTransactionsProvider } from '@/context/InsiderTransactionsContext';
import { SymbolProvider } from '@/context/SymbolContext';
import { HistoricalSummaryProvider } from '@/context/HistoricalSummaryContext';
import { HistoricalDataProvider } from '@/context/HistoricalDataContext';
import { TradesProvider } from '@/context/TradesContext';

const DashboardProvider = ({ children }) => {
    return (
        <SymbolProvider> 
            {/* Wrap everything in SymbolProvider to ensure global access to symbol */}
            <TradesProvider>
                <HistoricalDataProvider>
                    <HistoricalSummaryProvider>
                        <InsiderTransactionsProvider>
                            <EarningsCalendarProvider> 
                                {children}
                            </EarningsCalendarProvider>
                        </InsiderTransactionsProvider>
                    </HistoricalSummaryProvider>
                </HistoricalDataProvider>
            </TradesProvider>
        </SymbolProvider>
    );
};

export default DashboardProvider;