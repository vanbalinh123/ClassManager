import apiSlice from "../api.slice";

const updateUserApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateAdmin: builder.mutation({
            query: ({full_name, email, password, mobile, role, usercode}) => ({
                url: `/api/admin/${usercode}/`,
                method: 'PUT',
                body: {full_name, email, password, mobile, role, usercode}
            }),
        }),
        // updateTeacher: builder.mutation({
        //     query: (dataUpdate) => {
        //         const usercode = dataUpdate.get('usercode');
        //         return {
        //             url: `/api/teacher/${usercode}/`,
        //             method: 'PUT',
        //             body: dataUpdate,
        //         };
        //     },
        //     async onQueryStarted(data, { dispatch, queryFulfilled }) {
        //       const action = apiSlice.util.updateQueryData('listTeachers', undefined, draft => {
        //           console.log(draft)
        //           const usercode = data.get('usercode');
        //           console.log(usercode)
        //       });
        //       const patchResult = dispatch(action);
        //       try {
        //           await queryFulfilled;
        //       } catch {
        //           patchResult.undo();
        //       }
        //   }
        // }),
        updateStudent: builder.mutation({
            query: ({full_name, email, password, mobile, role, usercode}) => ({
                url: `/api/student/${usercode}/`,
                method: 'PUT',
                body: {full_name, email, password, mobile, role, usercode}
            }),
        }),
    })
})

export const {
    useUpdateAdminMutation,
    // useUpdateTeacherMutation,
    useUpdateStudentMutation
} = updateUserApi