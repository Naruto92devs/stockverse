import { EarningsCalendarProvider } from '@/context/EarningsCalendarContext';
import { InsiderTransactionsProvider } from '@/context/InsiderTransactionsContext';
import { SymbolProvider } from '@/context/SymbolContext';
import { HistoricalSummaryProvider } from '@/context/HistoricalSummaryContext';
import { HistoricalDataProvider } from '@/context/HistoricalDataContext';
import { TradesProvider } from '@/context/TradesContext';
import { IPOsProvider } from '@/context/IposContext';
import { GainersLosersProvider } from '@/context/GainersLosersContext';

const DashboardProvider = ({ children }) => {
    return (
        <SymbolProvider> 
            {/* Wrap everything in SymbolProvider to ensure global access to symbol */}
            <TradesProvider>
                <HistoricalDataProvider>
                    <HistoricalSummaryProvider>
                        <InsiderTransactionsProvider>
                            <EarningsCalendarProvider> 
                                <IPOsProvider>
                                    <GainersLosersProvider>
                                        {children}
                                    </GainersLosersProvider>
                                </IPOsProvider>
                            </EarningsCalendarProvider>
                        </InsiderTransactionsProvider>
                    </HistoricalSummaryProvider>
                </HistoricalDataProvider>
            </TradesProvider>
        </SymbolProvider>
    );
};

export default DashboardProvider;