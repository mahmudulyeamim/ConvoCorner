export function paymentDetailsHandler(paymentType) {
    if(paymentType == 1) {
        return 'Your company must have credit for each successful match. Credits can be purchased in advance and will be deducted from the account when both you and the talent likes the match';
    }
    if(paymentType == 2) {
        return 'Your company will be charged based on the salary you offer for the job';
    }
    if(paymentType == 3) {
        return  `You will be matched exclusively with the selected talents. Every talent is selected after a thorough screening process
        . You will be charged two months of the talent's salary for each successful hire and we will refund the amount if the talent leaves within the first 2 months of joining.`;
    }
}
