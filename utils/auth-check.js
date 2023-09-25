import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * useAuthCheck - 로그인, 어드민 권한, 및 결제 확인을 위한 Custom Hook
 * 
 * @param {boolean} requireLogin - 이 값이 true인 경우, 사용자가 로그인되어 있어야 합니다.
 * @param {boolean} requireAdmin - 이 값이 true인 경우, 사용자는 어드민 권한을 가져야 합니다.
 * @param {boolean} requirePayment - 이 값이 true인 경우, 사용자는 결제를 완료해야 합니다.
 * 
 * - 필요한 권한이 없는 경우, 적절한 페이지로 리다이렉트 됩니다.
 */
export const useAuthCheck = (requireLogin, requireAdmin, requirePayment) => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
        const role = localStorage.getItem('role');

        // 로그인 확인
        if (requireLogin && !isLoggedIn) {
            alert("로그인부터 해주세요.")
            router.push('/');
            return;
        }

        // 어드민 권한 확인
        if (requireAdmin && role !== 'ADMIN') {
            alert("권한 없음")
            router.push('/');
            return;
        }

        // 결제 확인. 실제로는 API 요청을 통해 확인해야 합니다.
        if (requirePayment) {
            // 임시 함수: 실제로는 서버로부터 결제 확인 결과를 받아야 합니다.
            const checkPayment = async () => {
                // 예시입니다. 실제로는 API 요청을 하시면 됩니다.
                return true; // 사용자가 결제함 나중에 수정이 필요함
            };

            checkPayment().then((isPaid) => {
                if (!isPaid) {
                    alert("결제가 필요합니다.")
                    router.push('/');
                }
            });
        }
    }, [router, requireLogin, requireAdmin, requirePayment]);
};
