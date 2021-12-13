// export const user = {
// 	username: 'Jane Doe',
// 	user_id: '48b7ddb4-4da2-4fac-9b50-0546f21aeb72',
// 	// user_id: '68284ebb-f25a-463c-aa31-737a948d5cac',
// };

export const user = JSON.parse( localStorage.getItem( 'user' ) );

console.log( 'users >>>>>>', user );
