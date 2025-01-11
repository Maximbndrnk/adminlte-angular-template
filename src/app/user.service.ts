import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  // Отримання всіх користувачів
  getUsers(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    });
  }

  // Створення нового користувача
  createUser(name: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($input: UserInput!) {
          createUser(input: $input) {
            id
            name
            email
          }
        }
      `,
      variables: {
        input: { name, email, password },
      },
    });
  }
}
