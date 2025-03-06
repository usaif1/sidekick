import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler, Platform, TouchableOpacity } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "@/theme/Theme.context"
import THEME from '~/theme/Sizes.theme';
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Button from '~/components/atoms/button/Button';
import { useTranslation } from 'react-i18next';
import STRINGS  from '~/language/LanguageConst';

interface InternetConnectivityWrapperProps {
    children: React.ReactNode;
}

const InternetConnectivityWrapper: React.FC<InternetConnectivityWrapperProps> = ({ children }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // Define the snap points for the bottom sheet
    const snapPoints = useMemo(() => ['10%'], []);

    // Function to check network connectivity
    const checkConnectivity = async () => {
        console.log('Checking connectivity...');
        try {
            const state = await NetInfo.fetch();
            const connected = state.isConnected ?? false;
            
            if (!connected) {
                bottomSheetModalRef.current?.present();
            } else {
                bottomSheetModalRef.current?.dismiss();
            }
        } catch (error) {
            console.error('Connectivity check failed:', error);
            bottomSheetModalRef.current?.present();
        }
    };

    useEffect(() => {
        // Initial check
        checkConnectivity();

        // Setup listener with error handling
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            try {
                const connected = state.isConnected ?? false;
                
                if (!connected) {
                    bottomSheetModalRef.current?.present();
                } else {
                    bottomSheetModalRef.current?.dismiss();
                }
            } catch (error) {
                console.error('NetInfo listener error:', error);
                bottomSheetModalRef.current?.present();
            }
        });

        // Cleanup
        return () => {
            unsubscribe();
        };
    }, []);

    // Styles for bottom sheet content elements
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        bottomSheetContainer: {
            paddingBottom: THEME.padding.vertical.xs_4,
            paddingHorizontal: THEME.padding.horizontal.md_20,
            backgroundColor: theme.color.textBlack,
            flex: 1,
        },
        contentWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textContainer: {
            alignItems: 'flex-start',
            marginBottom: THEME.margin.vertical.md_16,
            flex: 1,
        },
        titleWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        titleText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 10,
            marginLeft: 10,
        },
        subtitleText: {
            fontSize: 16,
            color: 'grey',
            textAlign: 'left'
        },
        refreshContainer: {
            marginLeft: 10,
        },
        wifiIcon: {
            marginBottom: 10,
        }
    });

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                {children}
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backdropComponent={() => <View style={styles.overlay} />}
                    backgroundStyle={{ backgroundColor:theme.color.textBlack }}
                    enablePanDownToClose={false}
                >
                    <BottomSheetView style={styles.bottomSheetContainer}>
                        <View style={styles.contentWrapper}>
                            <View style={styles.textContainer}>
                                <View style={styles.titleWrapper}>
                                    <MaterialIcons 
                                        name="wifi-off" 
                                        size={30} 
                                        color="white" 
                                        style={styles.wifiIcon}
                                    />
                                    <Text style={styles.titleText}>
                                        {t(STRINGS.NO_INTERNET_TITLE)}
                                    </Text>
                                </View>
                                <Text style={styles.subtitleText}>
                                    {t(STRINGS.NO_INTERNET_SUBTITLE)}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.refreshContainer} onPress={checkConnectivity}>
                                <MaterialIcons 
                                    name="refresh" 
                                    size={40} 
                                    color="green" 
                                />
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

export default InternetConnectivityWrapper;